import { Request, Response } from "express";
import HttpError from "../utils/Error";
import { ValidationFields } from "../utils/ValidationFields";
import bcrypt from 'bcrypt'
import { isEmptyObject } from "../utils/ObjectValidate";
import Hospital from "../models/Hospital";

class HospitalController {
    public static async getAll(request: Request, response: Response) {
        try {
            const [status, hospitais] = await Hospital.getAll();
            if (!status) throw new HttpError(400, hospitais as string)

            return response.status(200).json(hospitais)
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async createHospital(request: Request, response: Response) {
        try {
            const { name, address, city, state, postalCode, phoneNumber, isActive } = request.body

            ValidationFields.validateRequiredFields({ name, address, city, state, postalCode, phoneNumber });

            const [status, message] = await Hospital.createHospital(name, address, city, state, postalCode, phoneNumber, isActive)
            if (!status) throw new HttpError(400, message)

            return response.status(201).json({ message: message });
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

    public static async getHospitalsNotEvaluatedByUser(request: Request, response: Response) {
        try {
            if (isEmptyObject(request.params.id) || isNaN(Number(request.params.id))) throw new HttpError(400, "Invalid or missing ID.");

            const [status, hospitais] = await Hospital.getHospitalsNotEvaluatedByUser(Number(request.params.id));
            if (!status) throw new HttpError(400, hospitais as string)

            return response.status(200).json(hospitais)
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }
    }

}

export default HospitalController