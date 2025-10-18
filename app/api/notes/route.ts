// app/api/notes/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  
  // Тимчасові дані для тесту
  const notes = [
    {
      id: '1',
      title: 'Перша нотатка',
      content: 'Це вміст першої нотатки',
      tags: ['Work'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  return NextResponse.json({ 
    notes,
    totalPages: 1 
  });
}

export async function POST(request) {
  const { title, content, tags } = await request.json();
  
  // Тимчасова логіка створення
  const newNote = {
    id: Date.now().toString(),
    title,
    content,
    tags: tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return NextResponse.json(newNote, { status: 201 });
}