import { Note } from '../notepads/note/note.model';

export interface Gist {
	id: string;
	description: string;
	files: {[key: string]: Note};
	created_at: string;
}
