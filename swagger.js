import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Clínica - Sistema de Turnos",
      version: "1.0.0",
      description: "Documentación completa del sistema de gestión de turnos médicos"
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./routes/*.js"]
};

export const specs = swaggerJSDoc(options);
export { swaggerUi };