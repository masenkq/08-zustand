import { NextResponse } from 'next/server';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Тимчасове сховище (таке ж як у попередньому файлі)
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const note = notes.find(n => n.id === params.id);

    if (!note) {
      return NextResponse.json(
        { error: 'Нотатку не знайдено' },
        { status: 404 }
      );
    }

    return NextResponse.json(note);

  } catch (error) {
    return NextResponse.json(
      { error: 'Помилка при отриманні нотатки' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, tags } = await request.json();
    const noteIndex = notes.findIndex(n => n.id === params.id);

    if (noteIndex === -1) {
      return NextResponse.json(
        { error: 'Нотатку не знайдено' },
        { status: 404 }
      );
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      ...(title && { title }),
      ...(content && { content }),
      ...(tags && { tags: Array.isArray(tags) ? tags : [tags] }),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(notes[noteIndex]);

  } catch (error) {
    return NextResponse.json(
      { error: 'Помилка при оновленні нотатки' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const noteIndex = notes.findIndex(n => n.id === params.id);

    if (noteIndex === -1) {
      return NextResponse.json(
        { error: 'Нотатку не знайдено' },
        { status: 404 }
      );
    }

    notes = notes.filter(n => n.id !== params.id);

    return NextResponse.json({ message: 'Нотатку видалено' });

  } catch (error) {
    return NextResponse.json(
      { error: 'Помилка при видаленні нотатки' },
      { status: 500 }
    );
  }
}