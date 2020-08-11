const dataBase = require('./db');
const createProffy = require('./createProffy');

dataBase.then(async (db) => {
    // Inserir dados
    const proffyValue = {
        name: 'Mayk Brito',
        avatar: 'https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4',
        whatsapp: '899887766',
        // eslint-disable-next-line quotes
        bio: `Instrutor de Programação Web`,
    };

    const classValue = {
        subject: 1,
        cost: '50',
        // o proffy_id virá pelo dando de dados
    };

    const classScheduleValues = [
        // class_id virá pelo banco de dados após o cadastro da aula
        {
            weekday: 2,
            time_from: 720,
            time_to: 1220,
        },
        {
            weekday: 3,
            time_from: 520,
            time_to: 1020,
        },
    ];

    // await createProffy(db, { proffyValue, classValue, classScheduleValues });

    // Consultar os dados inseridos

    // Todos os proffys
    const registeredProffys = await db.all('SELECT * FROM proffys');
    /* console.log(registeredProffys); */
    // o * quer dizer que vai pegar todas as colunas
    // Consultar as classes de um determinado professor e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `);
    /* console.log(selectClassesAndProffys); */

    // ex: o professor trabalha de 8h às 18h
    // o (time_from) que o aluno selecionar tem que ser >= à 8h
    // e o (time_to)solicitado pelo aluno precisa < que 18h
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.* 
        FROM class_schedule
        WHERE class_schedule.class_id = '1'
        AND class_schedule.weekday = '3'
        AND class_schedule.time_from <= '520'
        AND class_schedule.time_to > '1020'
    `);
    console.log(selectClassesSchedules);
});
