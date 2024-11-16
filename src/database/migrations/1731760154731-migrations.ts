import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731760154731 implements MigrationInterface {
    name = 'Migrations1731760154731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_de87485f6489f5d0995f584195" ON "admin" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_de87485f6489f5d0995f584195"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
