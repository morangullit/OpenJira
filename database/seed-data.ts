

interface SeedData {
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pediente: Entry',
            status:'pending',
            createdAt: Date.now(),
        },
        {
            description: 'En-progreso: City',
            status:'in-progress',
            createdAt: Date.now() -1000000,
        },
        {
            description: 'Terminadas: Region',
            status:'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}