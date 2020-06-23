import {HighJumpTranslator} from "./HighJumpTranslator";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import {Outbound} from "../../../domain/models/Outbound";
import {HighJumpOutbound} from "./HighJumpOutbound";
import {inject, injectable} from "inversify";
import {TYPES} from "../../di/types";

@injectable()
export class HighJumpAdapter {
    constructor(@inject(TYPES.HighJumpTranslator) private readonly translator: HighJumpTranslator,
                @inject(TYPES.AxiosInstance) private readonly http: AxiosInstance) {
    }

    async createOutbound(origin: string, destination: string, items): Promise<Outbound> {
        try {
            const response : AxiosResponse<HighJumpOutbound> = await this.http.post('/outbound', {
                origin: origin,
                destination: destination,
                items: items
            });
            return this.translator.translate(response.data);
        } catch (exception) {
            // Convert this low level into a Domain level exception
        }
    }
}
