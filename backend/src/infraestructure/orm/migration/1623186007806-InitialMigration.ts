import { Patient } from "domain/model";
import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1623186007806 implements MigrationInterface {
    name = 'InitialMigration1623186007806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_f20f0bf6b734938c710e12c2782"`);
        await queryRunner.query(`CREATE TABLE "patient_users_user" ("patientId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_6a30c245fb4369a87dd653043d0" PRIMARY KEY ("patientId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_62f0ae9e446f58a14879c6786f" ON "patient_users_user" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0ad7b5fd399c44afd1dafe5c6e" ON "patient_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "patient_users_user" ADD CONSTRAINT "FK_62f0ae9e446f58a14879c6786f6" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_users_user" ADD CONSTRAINT "FK_0ad7b5fd399c44afd1dafe5c6e1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_users_user" DROP CONSTRAINT "FK_0ad7b5fd399c44afd1dafe5c6e1"`);
        await queryRunner.query(`ALTER TABLE "patient_users_user" DROP CONSTRAINT "FK_62f0ae9e446f58a14879c6786f6"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "user_id" integer`);
        await queryRunner.query(`DROP INDEX "IDX_0ad7b5fd399c44afd1dafe5c6e"`);
        await queryRunner.query(`DROP INDEX "IDX_62f0ae9e446f58a14879c6786f"`);
        await queryRunner.query(`DROP TABLE "patient_users_user"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_f20f0bf6b734938c710e12c2782" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
