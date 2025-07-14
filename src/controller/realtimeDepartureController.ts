import {
  isValid,
  NextDepartureRequest,
  toNextDepartureRequest,
} from "../model/NextDepartureRequest";
import { findNextDeparture, findNextNDepartures } from "../service/realtimeDepartureService";
import { createError, createResponse } from "../service/laMetricService";
import logger from "../logger";
import { NextDepartureResponse } from "../model/NextDepartureResponse";

export const INVALID_REQUEST = "Invalid request";
export const ERROR = "Error";

export async function getNextDeparture(req, res) {
  const nextDepartureRequest = toNextDepartureRequest(req);
  if (isValid(nextDepartureRequest)) {
    try {
      const nextDeparture = await findNextDeparture(nextDepartureRequest);
      const nextDepartureResponse = createResponse(
        nextDeparture,
        nextDepartureRequest.transportMode
      );
      res.json(nextDepartureResponse);
      logInfo(nextDepartureRequest, nextDepartureResponse);
    } catch (error) {
      const nextDepartureResponse = createError(
        ERROR,
        nextDepartureRequest.transportMode
      );
      res.json(nextDepartureResponse);
      logError(nextDepartureRequest, nextDepartureResponse, error);
    }
  } else {
    const nextDepartureResponse = createError(INVALID_REQUEST, undefined);
    res.json(nextDepartureResponse);
    logWarn(nextDepartureRequest, nextDepartureResponse);
  }
}

export async function getNextNDepartures(req, res) {
  const nextDepartureRequest = toNextDepartureRequest(req);
  if (isValid(nextDepartureRequest)) {
    try {
      const nextNDepartures = await findNextNDepartures(nextDepartureRequest);
      const nextNDeparturesResponse = createResponse(
        nextNDepartures,
        nextDepartureRequest.transportMode
      );
      res.json(nextNDeparturesResponse);
      logInfo(nextDepartureRequest, nextNDeparturesResponse);
    } catch (error) {
      const nextNDeparturesResponse = createError(
        ERROR,
        nextDepartureRequest.transportMode
      );
      res.json(nextNDeparturesResponse);
      logError(nextDepartureRequest, nextNDeparturesResponse, error);
    }
  } else {
    const nextNDeparturesResponse = createError(INVALID_REQUEST, undefined);
    res.json(nextNDeparturesResponse);
    logWarn(nextDepartureRequest, nextNDeparturesResponse);
  }
}

function logInfo(
  nextDepartureRequest: NextDepartureRequest,
  nextDepartureResponse: NextDepartureResponse
) {
  logger.info(
    `
    Request: ${JSON.stringify(nextDepartureRequest)} 
    Response: ${JSON.stringify(nextDepartureResponse)}`
  );
}

function logError(
  nextDepartureRequest: NextDepartureRequest,
  nextDepartureResponse: NextDepartureResponse,
  error
) {
  logger.error(
    `
    Request: ${JSON.stringify(nextDepartureRequest)} 
    Response: ${JSON.stringify(nextDepartureResponse)}
    Error: ${error.message}`
  );
}

function logWarn(
  nextDepartureRequest: NextDepartureRequest,
  nextDepartureResponse: NextDepartureResponse
) {
  logger.warn(
    `
    Request: ${JSON.stringify(nextDepartureRequest)} 
    Response: ${JSON.stringify(nextDepartureResponse)}`
  );
}
