INSERT INTO events
(
    server,
    channel,
    start_date,
    end_date,
    response_message,
    pass,
    created_by,
    file_url,
    is_whitelisted
)
VALUES (
    'brunitob',
    'secret',
    '2020-10-02 01:10:00',
    '2020-10-04 22:10:00',
    'message response {code}',
    'bDNX5e-pguY',
    'brunitob',
    'https://cdn.discordapp.com/attachments/746402543176777798/760230438832308244/testcodes.csv',
    false
);

INSERT INTO codes
(
    code,
    event_id,
    username,
    claimed_date,
    created_date
)
VALUES (
    'b99bb3',
    2,
    null,
    null,
   '2020-10-02 00:00'
);
