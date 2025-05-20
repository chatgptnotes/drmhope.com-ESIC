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
          { patientId: { contains: search, mode: 'insensitive' } },
          { name: { contains: search, mode: 'insensitive' } },
          { gender: { contains: search, mode: 'insensitive' } },
          { status: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {}

  const [total, admitted, discharged, rows] = await Promise.all([
    prisma.patient.count({ where }),
    prisma.patient.count({ where: { ...where, status: 'Admitted' } }),
    prisma.patient.count({ where: { ...where, status: 'Discharged' } }),
    prisma.patient.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: 'desc' },
    }),
  ])

  const stats = [
    { label: 'Total Patients', value: total, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Admitted', value: admitted, color: 'text-green-700', bg: 'bg-green-50' },
    { label: 'Discharged', value: discharged, color: 'text-purple-700', bg: 'bg-purple-50' },
  ]

  return NextResponse.json({ stats, rows, total })
}
