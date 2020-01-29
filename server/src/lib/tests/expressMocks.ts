export const createResponse = (): any => ({
  status: jest.fn(() => createResponse()),
  send: jest.fn(() => createResponse()),
  json: jest.fn(() => createResponse())
});

export const res = createResponse();

export const createRequest = (): any => ({});

export const req = createRequest();
