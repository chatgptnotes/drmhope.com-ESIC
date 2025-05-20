import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const search = searchParams.get('search')?.toLowerCase() || ''

  const where = search
    ? {
        OR: [
          { visitId: { contains: search, mode: 'insensitive' } },
          { tokenNo: { contains: search, mode: 'insensitive' } },
          { department: { contains: search, mode: 'insensitive' } },
          { doctor: { contains: search, mode: 'insensitive' } },
          { status: { contains: search, mode: 'insensitive' } },
          { patient: { patientId: { contains: search, mode: 'insensitive' } } },
          { patient: { name: { contains: search, mode: 'insensitive' } } },
        ],
      }
    : {}

  const [total, rows] = await Promise.all([
    prisma.oPDVisit.count({ where }),
    prisma.oPDVisit.findMany({
      where,
      include: { patient: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: 'desc' },
    }),
  ])

  const stats = [
    { label: 'Total OPD Patients', value: total, color: 'text-blue-700', bg: 'bg-blue-50' },
  ]

  return NextResponse.json({ stats, rows, total })
}
