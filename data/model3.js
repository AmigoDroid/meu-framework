export const modeloDeDados = {
  models: [

    /* ================= POP ================= */

    {
      name: "Pops",
      table: "pops",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        nome: { type: "STRING" },
        descricao: { type: "TEXT" },
        lat: { type: "FLOAT" },
        lng: { type: "FLOAT" }
      }
    },

    {
      name: "Racks",
      table: "racks",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        pop_id: { type: "INTEGER", references: "Pops" },
        nome: { type: "STRING" },
        posicao: { type: "STRING" }
      }
    },

    {
      name: "Equipamentos",
      table: "equipamentos",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        rack_id: { type: "INTEGER", references: "Racks" },
        nome: { type: "STRING" },
        tipo: { type: "STRING" }
      }
    },

    /* ================= PORTAS ================= */

    {
      name: "Portas",
      table: "portas",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        equipamento_id: { type: "INTEGER", references: "Equipamentos" },
        nome: { type: "STRING" },
        tipo: { type: "STRING" },
        subtipo: { type: "STRING" },
        velocidade: { type: "INTEGER" },
        status: { type: "STRING" },
        slot: { type: "INTEGER" },
        pon: { type: "INTEGER" }
      }
    },

    /* ================= VLAN ================= */

    {
      name: "Vlans",
      table: "vlans",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        numero: { type: "INTEGER" },
        descricao: { type: "STRING" }
      }
    },

    {
      name: "PortaVlans",
      table: "porta_vlans",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        porta_id: { type: "INTEGER", references: "Portas" },
        vlan_id: { type: "INTEGER", references: "Vlans" },
        modo: { type: "STRING" },
        tagged: { type: "BOOLEAN" },
        principal: { type: "BOOLEAN" }
      }
    },

    /* ================= CONEXÕES ================= */

    {
      name: "ConexoesFisicas",
      table: "conexoes_fisicas",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        porta_a_id: { type: "INTEGER", references: "Portas" },
        porta_b_id: { type: "INTEGER", references: "Portas" },
        tipo: { type: "STRING" }
      }
    },

    /* ================= DIO ================= */

    {
      name: "Dios",
      table: "dios",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        rack_id: { type: "INTEGER", references: "Racks" },
        nome: { type: "STRING" },
        lat: { type: "FLOAT" },
        lng: { type: "FLOAT" }
      }
    },

    {
      name: "PortasDio",
      table: "portas_dio",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        dio_id: { type: "INTEGER", references: "Dios" },
        numero: { type: "INTEGER" }
      }
    },

    /* ================= CABOS ================= */

    {
      name: "Cabos",
      table: "cabos",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        nome: { type: "STRING" },
        tipo: { type: "STRING" },
        total_fibras: { type: "INTEGER" },
        total_tubos: { type: "INTEGER" },
        coordenadas: { type: "JSON" },
        origem_tipo: { type: "STRING" },
        origem_id: { type: "INTEGER" },
        destino_tipo: { type: "STRING" },
        destino_id: { type: "INTEGER" }
      }
    },

    /* ================= TUBOS (LOOSE) ================= */

    {
      name: "Tubos",
      table: "tubos",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        cabo_id: { type: "INTEGER", references: "Cabos" },
        numero: { type: "INTEGER" },
        cor: { type: "STRING" }
      }
    },

    /* ================= FIBRAS ================= */

    {
      name: "Fibras",
      table: "fibras",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        tubo_id: { type: "INTEGER", references: "Tubos" },
        numero: { type: "INTEGER" },
        cor: { type: "STRING" },
        status: { type: "STRING" } // livre, usada, rompida
      }
    },

    {
      name: "Fusoes",
      table: "fusoes",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        fibra_a_id: { type: "INTEGER", references: "Fibras" },
        fibra_b_id: { type: "INTEGER", references: "Fibras" },
        tipo: { type: "STRING" },
        perda_db: { type: "FLOAT" },
        lat: { type: "FLOAT" },
        lng: { type: "FLOAT" }
      }
    },

    /* ================= FIBRA ↔ PORTA ================= */

    {
      name: "ConexaoFibraPorta",
      table: "conexao_fibra_porta",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        fibra_id: { type: "INTEGER", references: "Fibras" },
        porta_id: { type: "INTEGER", references: "Portas" }
      }
    },

    {
      name: "ConexaoFibraDio",
      table: "conexao_fibra_dio",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        fibra_id: { type: "INTEGER", references: "Fibras" },
        porta_dio_id: { type: "INTEGER", references: "PortasDio" }
      }
    },

    /* ================= CTO ================= */

    {
      name: "Ctos",
      table: "ctos",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        nome: { type: "STRING" },
        tipo: { type: "STRING" },
        lat: { type: "FLOAT" },
        lng: { type: "FLOAT" }
      }
    },

    {
      name: "PortasCto",
      table: "portas_cto",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        cto_id: { type: "INTEGER", references: "Ctos" },
        numero: { type: "INTEGER" }
      }
    },

    /* ================= SPLITTER ================= */

    {
      name: "Splitters",
      table: "splitters",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        local_tipo: { type: "STRING" },
        local_id: { type: "INTEGER" },
        tipo: { type: "STRING" },
        nivel: { type: "STRING" },
        lat: { type: "FLOAT" },
        lng: { type: "FLOAT" }
      }
    },

    {
      name: "PortasSplitter",
      table: "portas_splitter",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        splitter_id: { type: "INTEGER", references: "Splitters" },
        tipo: { type: "STRING" },
        numero: { type: "INTEGER" }
      }
    },

    {
      name: "ConexoesSplitter",
      table: "conexoes_splitter",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        porta_splitter_id: { type: "INTEGER", references: "PortasSplitter" },
        fibra_id: { type: "INTEGER", references: "Fibras" }
      }
    },

    /* ================= CLIENTE ================= */

    {
      name: "Clientes",
      table: "clientes",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        nome: { type: "STRING" },
        lat: { type: "FLOAT" },
        lng: { type: "FLOAT" }
      }
    },

    {
      name: "Onus",
      table: "onus",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        cliente_id: { type: "INTEGER", references: "Clientes" },
        serial: { type: "STRING" }
      }
    },

    {
      name: "ConexaoCliente",
      table: "conexao_cliente",
      fields: {
        id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
        porta_cto_id: { type: "INTEGER", references: "PortasCto" },
        onu_id: { type: "INTEGER", references: "Onus" },
        fibra_id: { type: "INTEGER", references: "Fibras" }
      }
    }

  ]
};