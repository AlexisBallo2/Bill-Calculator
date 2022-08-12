exports.up = (knex) =>
  knex.schema.createTable("dataTable2", (tbl) => {
    tbl.text("groupName", 300);
    tbl.text("dataArray", 10000);
    tbl.text("costArray", 10000);
  });

exports.down = (knex) => knex.schema.dropTableIfExists("dataTable2");
