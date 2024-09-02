import {ErrorFormatter} from "./ErrorFormatter";
import {StatusCodes} from "http-status-codes";
import {Helpers} from "../../../utils/helpers";

const STANDARD_INTERNAL_SERVER_ERROR_MESSAGE = "An internal server error occurred.";

export class RFC7807ErrorFormatter implements ErrorFormatter {
    public formatError = (error: Error): string => {
        const statusCode = this.getStatusCode(error);
        const title = this.getTitle(error, statusCode);
        const type = this.getType(error);

        return JSON.stringify({
            type: type,
            title: title,
            status: statusCode,
        });
    }

    private getStatusCode = (error: Error): StatusCodes => {
        return Helpers.mapErrorToStatusCode(error);
    }

    private getTitle = (error: Error, statusCode: StatusCodes): string => {
        return statusCode == StatusCodes.INTERNAL_SERVER_ERROR ? STANDARD_INTERNAL_SERVER_ERROR_MESSAGE : error.message;
    }

    private getType = (_error: Error): string => {
        return "about:blank";
    }
}

