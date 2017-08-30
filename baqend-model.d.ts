import {binding, GeoPoint} from "baqend";

declare module "baqend" {

  interface baqend {
    Questions: binding.EntityFactory<model.Questions>;
  }

  namespace model {
    interface User extends binding.Entity {
    }

    interface Role extends binding.Entity {
      name: string;
      users: Set<User>;
    }

    interface Questions extends binding.Entity {
      name: string;
      questions: any[];
    }

    interface Device extends binding.Entity {
      deviceOs: string;
    }

  }
}