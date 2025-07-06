import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1751826284310 implements MigrationInterface {
    name = 'Init1751826284310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL, "content" varchar, "status" varchar NOT NULL DEFAULT ('draft'), "locale" varchar NOT NULL DEFAULT ('en'), "createdById" varchar)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL DEFAULT ('user'))`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL, "content" varchar, "status" varchar NOT NULL DEFAULT ('draft'), "locale" varchar NOT NULL DEFAULT ('en'), "createdById" varchar, CONSTRAINT "FK_f91b3264d721d9a0f63dfdd3a4b" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "createdAt", "updatedAt", "title", "content", "status", "locale", "createdById") SELECT "id", "createdAt", "updatedAt", "title", "content", "status", "locale", "createdById" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL, "content" varchar, "status" varchar NOT NULL DEFAULT ('draft'), "locale" varchar NOT NULL DEFAULT ('en'), "createdById" varchar)`);
        await queryRunner.query(`INSERT INTO "post"("id", "createdAt", "updatedAt", "title", "content", "status", "locale", "createdById") SELECT "id", "createdAt", "updatedAt", "title", "content", "status", "locale", "createdById" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
