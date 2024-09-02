import request from 'supertest';
import app from '../src/app';
import {Server} from "node:net";
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import databaseConnector from "../src/database/connectors/DatabaseConnector";

let server: Server;

beforeAll(async  () => {
  // ? Espero hasta que se levante el server...
  setTimeout(() => {}, 5000);
  await databaseConnector.initializeConnection().then(_r => {
      console.log('Database connected');
  });
});

describe('MessageController', () => {
  it('should create a new message', async () => {
    const response = await createMessage();

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('_text', 'Hello, World!');

    await deleteMessage(response.body._id);
  });

  it('should get a message by ID', async () => {
    const creationResponse = await createMessage();
    const createdMessageId = creationResponse.body._id;

    const response = await request(app)
      .get(`/v1/messages/${createdMessageId}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('_text');

    await deleteMessage(response.body._id);
  });

  it('should delete a message by ID', async () => {
    const creationResponse = await createMessage();
    const createdMessageId = creationResponse.body._id;

    const response = await deleteMessage(createdMessageId);
    expect(response.body).toHaveProperty('result', 'Deleted');
  });

  it('should get all messages', async () => {
    const createResponse = await createMessage();

    const response = await request(app)
      .get('/v1/messages/')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);

    await deleteMessage(createResponse.body._id);
  });

  it("should receive error because message text is too long", async () => {
    const response = await request(app)
      .post('/v1/messages/')
      .send({ message: 'a'.repeat(1001) })
      .expect(400);
  });
});

function createMessage() {
  return request(app)
    .post('/v1/messages/')
    .send({ message: 'Hello, World!' })
}

function deleteMessage(id: string) {
  return request(app)
    .delete(`/v1/messages/${id}`)
}

afterAll( (done) => {
  databaseConnector.shutdownConnection().then(_r => {
    console.log('Database connection closed');
  });
});
