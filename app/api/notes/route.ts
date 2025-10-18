import { NextResponse } from 'next/server';

// Типи для нотаток
interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Тимчасове сховище (в реальному додатку використовуй базу даних)
let notes: Note[] = [
  {
    id: '1',
    title: 'Ласкаво просимо до NoteHub!',
    content: 'Це ваша перша нотатка. Почніть створювати свої нотатки вже сьогодні!',
    tags: ['Personal'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Список покупок',
    content: 'Молоко, яйця, хліб, фрукти',
    tags: ['Shopping'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Робочі завдання',
    content: 'Завершити проект, написати звіт, провести зустріч',
    tags: ['Work'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;

  try {
    // Фільтрація за тегом
    let filteredNotes = notes;
    
    if (tag && tag !== 'All') {
      filteredNotes = notes.filter(note => 
        note.tags.includes(tag)
      );
    }

    // Пошук
    if (search) {
      filteredNotes = filteredNotes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Пагінація
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNotes = filteredNotes.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredNotes.length / limit);

    return NextResponse.json({
      notes: paginatedNotes,
      totalPages,
      currentPage: page,
      totalNotes: filteredNotes.length
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Помилка при отриманні нотаток' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, tags = [] } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title та content обов\'язкові' },
        { status: 400 }
      );
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      tags: Array.isArray(tags) ? tags : [tags],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    notes.push(newNote);

    return NextResponse.json(newNote, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Помилка при створенні нотатки' },
      { status: 500 }
    );
  }
}