const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it('GET/cafes devuelve un status code 200 y un arreglo con al menos 1 objeto', async () => {
      const response = await request(server).get('/cafes');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

  it('DELETE/cafes/:id devuelve un status code 404 si el café no existe', async () => {
    const jwt = "Ddw5$#.rGAds54!d_ds#d46a"
    const cafeInexistente = Math.floor(Math.random() * 500)
    const response = await request(server)
      .delete(`/cafes/${cafeInexistente}`)
      .set("Authorization", jwt)
    expect(response.status).toBe(404);
  });


    it('POST/cafes agrega un nuevo café y devuelve un status code 201', async () => {
      const newCafe = {
        id: 40, // Reemplaza con un ID que no exista
        nombre: "Nescafe"
      };
      const response = await request(server)
        .post('/cafes')
        .send(newCafe);

      expect(response.status).toBe(201);
    });

  it('PUT/cafes devuelve un status code 400 si se intenta actualizar con un id diferente', async () => {
    const cafeIdParametro = 5
    const cafeIdBody = cafeIdParametro + 5
    const cafeToUpdate = {
      id: cafeIdBody, // Reemplaza con el ID de un café existente
      nombre: "CafeNegro"
    };
    const response = await request(server)
      .put(`/cafes/${cafeIdParametro}`)
      .send(cafeToUpdate);

    expect(response.status).toBe(400);
  });
});