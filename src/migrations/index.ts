import * as migration_20261115_183040_add_project_file_url from './20261115_183040_add_project_file_url';

export const migrations = [
  {
    up: migration_20261115_183040_add_project_file_url.up,
    down: migration_20261115_183040_add_project_file_url.down,
    name: '20261115_183040_add_project_file_url'
  },
];
