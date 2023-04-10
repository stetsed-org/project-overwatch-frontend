import { RequestHandler } from '@sveltejs/kit';
import { json, error, fail } from '@sveltejs/kit';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'truenas.selfhostable.net',
    user: 'data',
    password: 'data',
    database: 'data'
});

export async function POST({ request }) {
  const data = await request.json();
  const { xCoordinate, zCoordinate, startTime, authToken } = data as Record<string, any>;
  
    const [results] = await connection.query('SELECT * FROM auth ORDER BY id DESC LIMIT 1');

    if (results.length === 0 || results[0].authToken !== authToken) {
			//return fail(422, {description: "Invalid auth token"});
      return json({description: "Invalid auth token"});
      throw Error(400, "Invalid auth token");
    }
    if (isNaN(xCoordinate) || isNaN(zCoordinate)) {
      return json({description: "xCoordinate and zCoordinate must be numbers"});
      throw Error(400, "xCoordinate and zCoordinate must be numbers");
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (!dateRegex.test(startTime)) {
      return json({description: "startTime must be in the format YYYY-MM-DDTHH:MM"});
      throw Error(400, "startTime must be in the format YYYY-MM-DDTHH:MM");
    }


    const query = `SELECT * FROM global WHERE X BETWEEN ${xCoordinate - 20} AND ${xCoordinate + 20} AND Z BETWEEN ${zCoordinate - 20} AND ${zCoordinate + 20} AND Date > '${startTime}'`;

    const [response_data] = await connection.query(query);

    return json(response_data);
};

