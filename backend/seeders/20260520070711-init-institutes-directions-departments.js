export async function up(queryInterface, Sequelize) {
  // Институты
  await queryInterface.bulkInsert('institutes', [
    { full_name: 'Институт информационных технологий и технологического образования', short_name: 'ИИТТО' }, // 1
    { full_name: 'Институт педагогики', short_name: 'ИП' }, // 2
    { full_name: 'Институт психологии', short_name: 'ИПСИ' }, // 3
    { full_name: 'Институт художественного образования', short_name: 'ИХО' }, // 4
  ], {});

  // Направления
  await queryInterface.bulkInsert('directions', [
    // ИИТТО
    { institute_id: 1, code: '09.03.01', full_name: 'Информатика и вычислительная техника', short_name: 'ИВТ', education_form: 'bachelor'}, // 1
    { institute_id: 1, code: '09.03.02', full_name: 'Информационные технологии в дизайне', short_name: 'ИТВД', education_form: 'bachelor'}, // 2
    { institute_id: 1, code: '44.03.01', full_name: 'Информатика и информационные технологии в образовании', short_name: 'ИИТО', education_form: 'bachelor'}, // 3
    { institute_id: 1, code: '44.03.01', full_name: 'Технологическое образование', short_name: 'ТО', education_form: 'bachelor'}, // 4
    { institute_id: 1, code: '44.03.01', full_name: 'Робототехника, предпринимательство и дизайн в технологическом образовании', short_name: 'РобПредДиз', education_form: 'magistracy'}, // 5
    // ИП
    { institute_id: 2, code: '44.03.01', full_name: 'Дополнительное образование (Воспитательная работа)', short_name: 'ДО', education_form: 'bachelor' }, // 6
    { institute_id: 2, code: '44.03.02', full_name: 'Социальная педагогика и психология', short_name: 'СПП', education_form: 'bachelor' }, // 7
    { institute_id: 2, code: '44.04.01', full_name: 'Воспитание в системе образования', short_name: 'ВСО', education_form: 'magistracy' }, // 8
    { institute_id: 2, code: '44.04.01', full_name: 'Педагогика современной школы', short_name: 'ПСШ', education_form: 'magistracy' }, // 9
    // ИПСИ
    { institute_id: 3, code: '37.03.01', full_name: 'Психология человека и социального взаимодейсвтия', short_name: 'ПЧСВ', education_form: 'bachelor'}, // 10
    { institute_id: 3, code: '44.03.02', full_name: 'Психология образования', short_name: 'ПО', education_form: 'bachelor'}, // 11
    { institute_id: 3, code: '44.04.02', full_name: 'Когнитивные исследования в образовании', short_name: 'ПЧСВ', education_form: 'magistracy'}, // 12
    // ИХО
    { institute_id: 4, code: '50.03.02', full_name: 'Академическая живопись', short_name: 'АкадЖив', education_form: 'bachelor'}, // 13
    { institute_id: 4, code: '50.03.03', full_name: 'История искусств и дизайна', short_name: 'ИИД', education_form: 'bachelor'}, // 14
    { institute_id: 4, code: '44.04.01', full_name: 'Визуальные искусства и художественное образование', short_name: 'ВИХО', education_form: 'bachelor'}, // 15
  ], {});

  // Кафедры
  await queryInterface.bulkInsert('departments', [
    // ИИТТО
    { institute_id: 1, full_name: 'Кафедра информационных систем', short_name: 'КИС' }, // 1
    { institute_id: 1, full_name: 'Кафедра инфорационных технологий и электронного обучения', short_name: 'КИТиЭО' }, // 2
    { institute_id: 1, full_name: 'Кафедра цифрового образования', short_name: 'КЦО' }, // 3
    { institute_id: 1, full_name: 'Кафедра технологического образования', short_name: 'КТО' }, // 4
    // ИП
    { institute_id: 2, full_name: 'Кафедра истории педагогики и образования', short_name: 'КИПиО' }, // 5
    { institute_id: 2, full_name: 'Кафедра педагогики школы', short_name: 'КПШ' }, // 6
    { institute_id: 2, full_name: 'Кафедра теории и методики воспитания и социальной работы', short_name: 'КТиМВиСР' }, // 7
    { institute_id: 2, full_name: 'Кафедра теории и методики непрерывного педагогического образования', short_name: 'КТиМНПО' }, // 8
    // ИПСИ
    { institute_id: 3, full_name: 'Кафедра общей и социальной психологии', short_name: 'КОиСП' }, // 9
    { institute_id: 3, full_name: 'Кафедра психологии развития и образования', short_name: 'КПРиО' }, // 10
    { institute_id: 3, full_name: 'Кафедра психологии профессиональной деятельности и инфомрационных технологий в образовании', short_name: 'КППДиИТвО' }, // 11
    { institute_id: 3, full_name: 'Кафедра клинической психологии и психологической помощи', short_name: 'ККПиПП' }, // 12
    // ИХО
    { institute_id: 4, full_name: 'Кафедра живописи', short_name: 'КЖ' }, // 13
    { institute_id: 4, full_name: 'Кафедра графики и скульптуры', short_name: 'КГиС' }, // 14
    { institute_id: 4, full_name: 'Кафедра декоративного искусства и дизайна', short_name: 'КДИиД' }, // 15
    { institute_id: 4, full_name: 'Кафедра искусствоведения и педагогики искусства', short_name: 'КИиПИ' }, // 16
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('departments', null, {});
  await queryInterface.bulkDelete('directions', null, {});
  await queryInterface.bulkDelete('institutes', null, {});
}