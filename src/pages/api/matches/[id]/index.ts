import env from "@/configs/env";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { MatchInfo } from "@/helper/helper";

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse,
// ) {
// 	try {
// 		const sport = await helper2();
// 		// console.log(sport.data);

// 		// Check if sport.data is an object and contains a response array
// 		if (!sport || typeof sport.data.response !== "object") {
// 			return res.status(400).json({
// 				status: false,
// 				message: "Data not found or invalid",
// 			});
// 		}
// 		// console.log(sport.data.response);

// 		const { match_id, short_title, subtitle, status_note, teama, teamb } =
// 			sport.data.response;

// 		// Create simplifiedData object
// 		const simplifiedData = {
// 			match_id,
// 			short_title,
// 			subtitle,
// 			status_note,
// 			short_name: teama?.short_name,
// 			short_name2: teamb?.short_name,
// 			scores_full1: teama?.scores_full,
// 			scores_full2: teamb?.scores_full,
// 			logo_url1: teama?.logo_url,
// 			logo_url2: teamb?.logo_url,
// 		};

// 		console.log("simplifiedData: ", simplifiedData);
// 		return res.json(simplifiedData);
// 	} catch (error: any) {
// 		console.log(error.message);
// 		return res.status(500).json({
// 			status: false,
// 			message: "Internal server error",
// 		});
// 	}
// }
// match detail
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const query = req.query;
		// Call the helper function to fetch the data
		const sport = await MatchInfo(`${query.id}`);

		// Check if sport.data.response is an object
		if (!sport || !sport.data || !sport.data.response) {
			return res.status(400).json({
				status: false,
				message: "Data not found or invalid",
				data: null,
			});
		}

		// Return the entire response data
		return res.json({
			status: true,
			message: "Data found successfully",
			data: sport.data.response,
		});
	} catch (error: any) {
		console.log(error.message);
		return res.status(500).json({
			status: false,
			message: "Internal server error",
			data: null,
		});
	}
}
