// app/api/notes/[id]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  
  // Тимчасова логіка
  const note = {
    id,
    title: 'Тестова нотатка',
    content: 'Це вміст тестової нотатки',
    tags: ['Work'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return NextResponse.json(note);
}

export async function PATCH(request, { params }) {
  const { id } = params;
  const { title, content, tags } = await request.json();
  
  // Тимчасова логіка оновлення
  const updatedNote = {
    id,
    title: title || 'Оновлена нотатка',
    content: content || 'Оновлений вміст',
    tags: tags || ['Work'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return NextResponse.json(updatedNote);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  
  // Тимчасова логіка видалення
  return NextResponse.json({ 
    message: `Note ${id} deleted` 
  });
}