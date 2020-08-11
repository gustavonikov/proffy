/* eslint-disable camelcase */
module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {
    // inserir dados na tabela de proffys
    const registeredProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio

        ) VALUES (
            '${proffyValue.name}',
            '${proffyValue.avatar}',
            '${proffyValue.whatsapp}',
            '${proffyValue.bio}'
        );
    `);

    const proffy_id = registeredProffy.lastID;

    // inserir dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
        
            ) VALUES (
                '${classValue.subject}',
                '${classValue.cost}',
                '${proffy_id}'
            );
    `);

    const class_id = insertedClass.lastID;

    // Inserir dados na tabela classSchedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to

            ) VALUES (
                '${class_id}',
                '${classScheduleValue.weekday}',
                '${classScheduleValue.time_from}',
                '${classScheduleValue.time_to}'
            );
    `));

    // aqui vou executar os db.runs() das classSchedules
    await Promise.all(insertedAllClassScheduleValues);
};
