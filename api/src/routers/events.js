import express from "express";
import {
  getEvents,
  getEventById,
  postEvent,
  patchEvent,
  removeEvent,
} from "#controllers/events.js";

const eventsRouter = express.Router();

/**
 * Events router (MVC example)
 *
 * This router demonstrates how HTTP routes are mapped to controller handlers
 * within the MVC structure used in this backend skeleton.
 *
 * Only some routes are required for the base trainee assignment.
 * Additional routes are included as OPTIONAL placeholders to illustrate
 * how the API structure may grow (for example with admin functionality).
 *
 * Optional routes should only be implemented if the trainee decides to
 * extend the project beyond the required scope.
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get paginated list of events
 *     description: Returns a paginated list of events. Pagination is zero-based. Supports optional search.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Zero-based page index.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *         description: Number of items per page.
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query applied to event titles.
 *     responses:
 *       200:
 *         description: Paginated list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Event"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         description: Invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

eventsRouter.get("/", getEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Returns a single event by its ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID.
 *     responses:
 *       200:
 *         description: Event found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Event"
 *       404:
 *         description: Event not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

eventsRouter.get("/:id", getEventById);

/**
 * OPTIONAL ROUTE PLACEHOLDER
 *
 * Example of a "create event" endpoint (typically admin functionality).
 *
 * @swagger
 * /events:
 *   post:
 *     summary: Create event (optional/admin)
 *     tags:
 *       - Events
 *     responses:
 *       501:
 *         description: Not implemented in base skeleton
 */
eventsRouter.post("/", postEvent);

/**
 * OPTIONAL ROUTE PLACEHOLDER
 *
 * Example of an "update event" endpoint.
 *
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Update event (optional/admin)
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       501:
 *         description: Not implemented in base skeleton
 */
eventsRouter.patch("/:id", patchEvent);

/**
 * OPTIONAL ROUTE PLACEHOLDER
 *
 * Example of a "delete event" endpoint.
 *
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete event (optional/admin)
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       501:
 *         description: Not implemented in base skeleton
 */
eventsRouter.delete("/:id", removeEvent);

export default eventsRouter;
