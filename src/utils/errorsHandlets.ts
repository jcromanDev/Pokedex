import {
  all,
  allError,
  errorClientContainer,
  errorMessage,
  pokemonInfo,
} from "../dom/elements.dom";

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends CustomError {
  statusCode: number = 400;

  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    showClientErrorWindow(`Validation error: ${message}`);
  }
}

export class UnauthorizedError extends CustomError {
  statusCode: number = 401;

  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    showClientErrorWindow(`Unauthorized Error: ${message}`);
  }
}

export class ForbiddenError extends CustomError {
  statusCode: number = 403;

  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
    showClientErrorWindow(`Forbidden Error: ${message}`);
  }
}

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    showClientErrorWindow(`Not Found Error: ${message}`);
  }
}

export class InternalServerError extends CustomError {
  statusCode: number = 500;

  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
    showServerErrorWindow(`Internal Server Error: ${message}`);
  }
}

export class BadGatewayError extends CustomError {
  statusCode: number = 502;

  constructor(message: string) {
    super(message);
    this.name = "BadGatewayError";
    showServerErrorWindow(`Bad Gateway Error: ${message}`);
  }
}

export class GatewayTimeoutError extends CustomError {
  statusCode: number = 504;

  constructor(message: string) {
    super(message);
    this.name = "GatewayTimeoutError";
    showServerErrorWindow(`Gateway Timeout Error: ${message}`);
  }
}

export const customErrorHandler = (statusCode: number): void => {
  switch (statusCode) {
    case 400:
      throw new ValidationError(
        "Invalid pokemon input, please try another pokemon."
      );
    case 401:
      throw new UnauthorizedError("Sorry, permission required.");
    case 403:
      throw new ForbiddenError(
        "Forrbiden content, please try another information."
      );
    case 404:
      throw new NotFoundError(
        "Pokemon not found, please try another valid pokemon name or id."
      );
    case 500:
      throw new InternalServerError(
        "OOpss! Server is unavailable in this moment."
      );
    case 502:
      throw new BadGatewayError("Invalid respose from server.");
    case 504:
      throw new GatewayTimeoutError("Request has expired, please try again.");
  }
};

export const initializeErrorHandler = () => {
  if (window.location.hash.startsWith("#info/")) {
    all.style.display = "none";
    pokemonInfo.style.display = "block";
  } else {
    all.style.display = "block";
    pokemonInfo.style.display = "none";
  }
  allError.style.display = "none";
  errorMessage.textContent = "";
};

const showClientErrorWindow = (message: string) => {
  all.style.display = "none";
  pokemonInfo.style.display = " none";
  allError.style.display = "flex";
  errorClientContainer.style.display = "block";
  errorMessage.textContent = message;

  allError.scrollIntoView({ behavior: "smooth", block: "center" });
};

const showServerErrorWindow = (message: string) => {
  all.style.display = "none";
  pokemonInfo.style.display = " none";
  allError.style.display = "flex";
  errorClientContainer.style.display = "none";

  errorMessage.textContent = message;

  allError.scrollIntoView({ behavior: "smooth", block: "center" });
};
