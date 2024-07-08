
export enum Status {
	OPEN = 'OPEN',
	CLOSED = 'CLOSED',
	WAITING = 'WAITING',
	ACTIVE = 'ACTIVE',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETE = 'COMPLETE',
	CANCELLED = 'CANCELLED'
}

export const formatDate = (date: string | Date) : string =>{
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }