import { Migration } from '@mikro-orm/migrations';

export class Migration20210510212046 extends Migration {

  async up(): Promise<void> {
    this.addSql('select 1');
  }

}
