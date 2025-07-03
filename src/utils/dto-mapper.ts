import { DataTable } from '@cucumber/cucumber';
import { LoginDTO } from '../types/dto';

export class DTOMapper {
  static mapToLoginDTO(dataTable: DataTable): LoginDTO[] {
    return dataTable.hashes().map(row => ({
      username: row.username,
      password: row.password
    }));
  }
}
