import * as fs from 'fs';
import { configService } from '../shared/config/config.service';

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.typeOrmConfig, null, 2),
);
