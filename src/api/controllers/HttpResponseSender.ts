import {Response} from "express";
import {StatusCodes} from "http-status-codes";

export class HttpResponseSender {
    /**
     * Sets the provided object as the response body and sends the response with status code 200.
     * @param res - The Response object to send.
     * @param object - The object to set as the response body.
     * @throws {Error} If the provided object cannot be converted to the standard body media type.
     */
    public okResponse = <T>(res: Response, object: T): void => {
        this.setUpAndSendResponse(res, object, StatusCodes.OK);
    }

    /**
     * Sets the provided object as the response body and sends the response with status code 201.
     * @param res - The Response object to send.
     * @param object - The object to set as the response body.
     * @throws {Error} If the provided object cannot be converted to the standard body media type.
     */
    public createdResponse = <T>(res: Response, object: T): void => {
        this.setUpAndSendResponse(res, object, StatusCodes.CREATED);
    }

    public response = <T>(res: Response, object: T, statusCode: StatusCodes): void => {
        this.setUpAndSendResponse(res, object, statusCode);
    }

    /**
     * Sets the provided object as the response body and sends the response with the given status code.
     * @param res - The Response object to send.
     * @param object - The object to set as the response body.
     * @param statusCode - The status code to send with the response.
     * @throws {Error} If the provided object cannot be converted to the standard body media type.
     */
    private setUpAndSendResponse = <T>(res: Response, object: T, statusCode: StatusCodes): void => {
        res.status(statusCode);
        res.json(object);
    }
}