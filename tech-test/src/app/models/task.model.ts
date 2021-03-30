export interface TaskModel {
  id: number;
  label: string;
  description?: string;
  category?: string;
  priority?: string;
  done?: boolean;
  dueDate?: Date;
  completionDate?: Date;
}
