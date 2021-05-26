async function checkCodeForEventUsernameTask(db, event_id, username){
    const now = new Date();
    return await db.task(async (t) => {
        let code = await t.oneOrNone(
            "SELECT code FROM codes WHERE event_id = $1 AND username = $2::numeric;",
            [event_id, username], (a) => a? a.code : null);
        if(code)
            return code;

        code = await t.one(
            "UPDATE codes SET username = $1::numeric, claimed_date = $3::timestamp WHERE code in (SELECT code FROM codes WHERE event_id = $2 AND username IS NULL ORDER BY RANDOM() LIMIT 1) RETURNING code;",
            [username, event_id, now], (a) => a.code);
        return code;
    })
}

async function checkCodeForEventUsername(db, event_id, username) {
    try{
        return await checkCodeForEventUsernameTask(db, event_id, username);
    }catch (e){
        console.log(`[CodeDao] Error in checkCodeForEventTask, error: ${e}`);
        return undefined;
    }
}

async function getActiveEventByPass(db, eventPass){
    const now = new Date();
    return await db.oneOrNone("SELECT * FROM events WHERE pass = $1::text AND is_active = $2::boolean AND end_date >= $3::timestamp AND start_date <= $3::timestamp",
        [eventPass, true, now]);
}

async function getEventByPass(db, eventPass){
    return await db.oneOrNone("SELECT * FROM events WHERE pass = $1::text", [eventPass]);
}

module.exports = {
    getEventByPass,
    getActiveEventByPass,
    checkCodeForEventUsername,
};