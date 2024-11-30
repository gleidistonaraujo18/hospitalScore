import { Request, Response } from "express";
import HttpError from "../utils/Error";
import { ValidationFields } from "../utils/ValidationFields";
import isInvalidEmail from "../utils/EmailValidator";
import bcrypt from 'bcrypt'
import User from "../models/User";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { isEmptyObject } from "../utils/ObjectValidate";

class UserController {

    /**
     * @param {Request} request - O objeto de requisição.
     * @param {Response} response - O objeto de resposta.
     */

    public static async getById(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");

            const [success, user] = await User.getById(Number(request.params.id));

            if (!success) throw new HttpError(404, user as string);

            return response.status(200).json({ user });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async registerUser(request: Request, response: Response) {
        try {
            const { name, email, password } = request.body

            ValidationFields.validateRequiredFields({ name, email, password });

            if (isInvalidEmail(email)) throw new HttpError(400, "Formato de e-mail inválido");

            const hashPass = await bcrypt.hash(password, 10);

            const [success, message] = await User.registerUser(name, email, hashPass)
            if (!success) throw new HttpError(400, message);

            return response.status(201).json({ message: message, status: 201 })
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }

    }

    public static async updateUser(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");

            if (isEmptyObject(request.body)) throw new HttpError(400, "No fields provided for update.");
            if (isInvalidEmail(request.body.email)) throw new HttpError(400, "Invalid email format");

            const [success, message] = await User.updateUser(Number(request.params.id), request.body);

            if (!success) throw new HttpError(400, message);

            return response.status(200).json({ message: "User updated successfully." });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async authenticate(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            if (!email || !password) throw new HttpError(400, "Email and password are required.");
            if (isInvalidEmail(email)) throw new HttpError(400, "Invalid email format");

            const [success, message] = await User.authenticate(email);
            if (!success) throw new HttpError(400, message as string)

            const user = message as { id: number, name: string, email: string, password: string, }

            if (await bcrypt.compare(password, user.password) === false) throw new HttpError(401, "Invalid password");
            return response.status(200).json({ token: jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.SECRET || '', { expiresIn: '1h' }) });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }

    }

}

export default UserController