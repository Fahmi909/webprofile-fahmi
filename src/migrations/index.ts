import * as migration_20261115_183040_add_project_file_url from './20261115_183040_add_project_file_url';
import * as migration_20261115_230313 from './20261115_230313';

export const migrations = [
  {
    up: migration_20261115_183040_add_project_file_url.up,
    down: migration_20261115_183040_add_project_file_url.down,
    name: '20261115_183040_add_project_file_url',
  },
  {
    up: migration_20261115_230313.up,
    down: migration_20261115_230313.down,
    name: '20261115_230313'
  },
];
