import fs from "fs";

export default async (req, res) => {
    if (!fs.existsSync("logger.log"))
        fs.writeFileSync("logger.log", "Common Log Format File Created");

    const url = req.url;
    const method = req.method;
    const protocol = req.protocol;
    const version = req.httpVersion;
    const content_type = req.headers["content-type"] || "-";
    const user_agent = req.headers["user-agent"] || "-";
    const host = req.hostname;
    const content_length = req.headers["content-length"] || "0";
    const date = new Date().toISOString();
    const status = res.statusCode || "-";
    const clf = `${host} ${user_agent} $athun [${date}] "${method} ${url} ${protocol}/${version}" ${status} ${content_length}\n`;
    fs.appendFileSync("logger.log", clf);
};
