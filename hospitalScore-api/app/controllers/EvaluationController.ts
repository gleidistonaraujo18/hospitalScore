import { Request, Response } from "express";
import HttpError from "../utils/Error";
import { ValidationFields } from "../utils/ValidationFields";
import { isEmptyObject } from "../utils/ObjectValidate";
import Evaluation from "../models/Evaluation";

class EvaluationController {

    public static async register(request: Request, response: Response) {

        try {
            const { idHospital, idUser, atendimento, limpeza, tempoEspera, qualidadeInstalacoes, textoLivre } = request.body
            ValidationFields.validateRequiredFields({ idHospital, idUser, atendimento, limpeza, tempoEspera, qualidadeInstalacoes });

            const [status, message] = await Evaluation.register(idHospital, idUser, atendimento, limpeza, tempoEspera, qualidadeInstalacoes, textoLivre);
            if (!status) throw new HttpError(400, message)

            return response.status(201).json({ message: message })
        } catch (error: unknown) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: "An unknown error occurred" });
        }

    }

}

export default EvaluationController