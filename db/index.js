const v2 = require("./db-v2");

async function getRealtimeActiveEvents(db) {
  const now = new Date();

  const res = await db.query(
    "SELECT * FROM events WHERE end_date >= $1::timestamp AND start_date <= $1::timestamp AND is_active = $2",
    [now, true]
  );
  return res;
}

async function getFutureActiveEvents(db) {
  const now = new Date();

  const res = await db.query(
    "SELECT * FROM events WHERE end_date >= $1::timestamp AND is_active = $2",
    [now, true]
  );
  return res;
}

async function getAllEvents(db) {
  const res = await db.query("SELECT * FROM events WHERE is_active = $1", [
    true,
  ]);
  return res;
}

async function getGuildEvents(db, server) {
  const now = new Date();
  const res = await db.any(
    "SELECT * FROM events WHERE end_date >= $1::timestamp AND server = $2::text AND is_active = $3",
    [now, server, true]
  );

  return res;
}

async function getGuildActiveEvents(db, server) {
  const now = new Date();
  const res = await db.any(
    "SELECT * FROM events WHERE end_date >= $1::timestamp AND start_date <= $1::timestamp AND server = $2::text AND is_active = $3",
    [now, server, true]
  );

  return res;
}

async function getBannedUsersById(db, user_id) {
  console.log("checking, ", user_id);
  const res = await db.any(
    "SELECT COUNT(*) FROM banned WHERE user_id LIKE $1::text",
    user_id
  );
  console.log(user_id, res[0].count);

  return res[0].count > 0;
}

async function countTotalCodes(db, event_id) {
  const res = await db.one("SELECT count(*) FROM codes WHERE event_id = $1", [
    event_id,
  ]);

  // console.log("countTotalCodes", res);
  return res;
}

async function countClaimedCodes(db, event_id) {
  const res = await db.one(
    "SELECT count(*) FROM codes WHERE event_id = $1 AND username IS NOT NULL",
    [event_id]
  );

  // console.log("countClaimedCodes", res);
  return res;
}

async function getFutureEventFromPass(db, messageContent) {
    const events = await getFutureActiveEvents(db);
    // check for similar strings on active events pass
    const eventSelected = events.find((e) =>
        isMsgTheSame(messageContent, e.pass)
    );
    console.log(
        `[DB] ${eventSelected && eventSelected.length} for pass: ${messageContent}`
    );

    return eventSelected;
}

async function getEventFromPass(db, messageContent) {
  const events = await getRealtimeActiveEvents(db);
  // check for similar strings on active events pass
  const eventSelected = events.find((e) =>
    isMsgTheSame(messageContent, e.pass)
  );
  console.log(
    `[DB] ${eventSelected && eventSelected.length} for pass: ${messageContent}`
  );

  return eventSelected;
}

async function checkCodeForEventUsername(db, event_id, username) {
  const now = new Date();
  const res = await db
    .task(async (t) => {
      
      const event = await t.one(
        "SELECT is_whitelisted FROM events where id = $1",
        [event_id]
      );

      console.log(`[DB] checking if ${event_id} is_whitelisted: ${event.is_whitelisted}`);

      if (event.is_whitelisted) {
        const user_whitelisted = await t.one(
          "SELECT * FROM whitelist WHERE user_id = $1 AND event_id = $2",
          [username, event_id]
        );
      }

      let code = await t.oneOrNone(
        "SELECT code FROM codes WHERE event_id = $1 AND username = $2::numeric;",
        [event_id, username], (a) => a? a.code : null);
      if(code){
          return code;
      }

      code = await t.one(
        "UPDATE codes SET username = $1, claimed_date = $3::timestamp WHERE code in (SELECT code FROM codes WHERE event_id = $2 AND username IS NULL ORDER BY RANDOM() LIMIT 1) RETURNING code",
        [username, event_id, now], (a) => a.code);

      console.log(`[DB] checking event: ${event_id}, user: ${username} `);
      return code;
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(`[ERROR] ${error.message} -> ${error.received}`);
      return false;
    });

  return res;
}

async function saveEvent(db, event, username) {
  const now = new Date();
  console.log(event);

  const res = await db.none(
    "INSERT INTO events (id, server, channel, start_date, end_date, response_message, pass, file_url, created_by, created_date, is_whitelisted ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);",
    [
      event.uuid,
      event.server,
      event.channel,
      event.start_date,
      event.end_date,
      event.response_message,
      event.pass,
      event.file_url,
      username,
      now,
      false,
    ]
  );
  console.log(res);

  return res;
}

async function addCode(db, uuid, code) {
  const now = new Date();
  const res = await db.none(
    "INSERT INTO codes (code, event_id, created_date ) VALUES ( $1, $2, $3 );",
    [code, uuid, now]
  );

  return res;
}

async function isPassAvailable(db, pass) {
  let res = true;
  const events = await getAllEvents(db);

  const eventSelected = events.find((e) =>
    isMsgTheSame(pass, e.pass)
  );
  console.log(
    `[DB] exist event: ${eventSelected && eventSelected.id} for pass: ${pass}`
  );
  if (eventSelected) {
    res = false;
  }

  return res;
}

const isMsgTheSame = (message, eventPass) => {
  let messagePass = message.replace('!', '').replace(/ /g, "");
  return eventPass.localeCompare(messagePass, undefined, { sensitivity: 'base' }) === 0;
}

module.exports = {
  getRealtimeActiveEvents,
  getEventFromPass,
  getFutureEventFromPass,
  checkCodeForEventUsername,
  getGuildEvents,
  countTotalCodes,
  countClaimedCodes,
  saveEvent,
  isPassAvailable,
  addCode,
  getFutureActiveEvents,
  getBannedUsersById,
    v2,
};
