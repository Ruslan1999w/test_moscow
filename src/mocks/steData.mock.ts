interface SteRawItem {
    id?: number
    steName?: string
    isActual?: boolean
    priceEndDate?: number | null
    priceNotNds?: number
    nds?: number
    fillEndDate?: number | null
}

function addDays(days: number): number {
    const result = new Date()
    result.setDate(result.getDate() + days)
    return result.getTime()
}

export const mockSteData: SteRawItem[] = [
    {
        id: 1,
        steName: 'СТЕ-001',
        isActual: true,
        priceEndDate: addDays(30),
        priceNotNds: 1000,
        nds: 20,
        fillEndDate: Date.now()
    },
    {
        id: 2,
        steName: 'СТЕ-002',
        isActual: false,
        priceEndDate: addDays(15),
        priceNotNds: 2500,
        nds: 10,
        fillEndDate: null
    },
    {
        id: 3,
        steName: 'СТЕ-003',
        isActual: true,
        priceEndDate: addDays(60),
        priceNotNds: 500,
        nds: 20,
        fillEndDate: addDays(1)
    },
    {
        id: 4,
        steName: 'СТЕ-004',
        isActual: true,
        priceEndDate: addDays(45),
        priceNotNds: 1200,
        nds: 20,
        fillEndDate: null
    },
    {
        id: 5,
        steName: 'СТЕ-005',
        isActual: false,
        priceEndDate: addDays(10),
        priceNotNds: 800,
        nds: 0,
        fillEndDate: addDays(3)
    },
    {
        id: 6,
        steName: 'СТЕ-006',
        isActual: true,
        priceEndDate: addDays(90),
        priceNotNds: 3000,
        nds: 20,
        fillEndDate: addDays(7)
    },
    {
        id: 7,
        steName: 'СТЕ-007',
        isActual: true,
        priceEndDate: null,
        priceNotNds: 1500,
        nds: 10,
        fillEndDate: addDays(14)
    },
    {
        id: 8,
        steName: 'СТЕ-008',
        isActual: false,
        priceEndDate: addDays(5),
        priceNotNds: 200,
        nds: 20,
        fillEndDate: null
    },
    {
        id: 9,
        steName: 'СТЕ-009',
        isActual: true,
        priceEndDate: addDays(25),
        priceNotNds: 750,
        nds: 20,
        fillEndDate: addDays(2)
    },
    {
        id: 10,
        steName: 'СТЕ-010',
        isActual: true,
        priceEndDate: addDays(70),
        priceNotNds: 4000,
        nds: 20,
        fillEndDate: addDays(10)
    },
    {
        id: 11,
        steName: 'СТЕ-011',
        isActual: false,
        priceEndDate: addDays(20),
        priceNotNds: 600,
        nds: 10,
        fillEndDate: null
    },
    {
        id: 12,
        steName: 'СТЕ-012',
        isActual: true,
        priceEndDate: addDays(100),
        priceNotNds: 900,
        nds: 20,
        fillEndDate: addDays(5)
    },
    {
        id: 13,
        steName: 'СТЕ-013',
        isActual: true,
        priceEndDate: addDays(80),
        priceNotNds: 1100,
        nds: 20,
        fillEndDate: addDays(20)
    }
]