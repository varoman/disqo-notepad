import { Note } from '../notepads/note/note.model';

export interface Gist {
	description: string;
	files: {[key: string]: Note};
	created_at: string;
}
