import { supabase } from "../lib/supabase";
import type { BaseEntity } from "../types/BaseEntity";

export class BaseCrudService<T extends BaseEntity> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async getAll(
    orderBy: string = "created_at",
    ascending: boolean = false
  ): Promise<T[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .order(orderBy, { ascending });

    if (error) throw error;

    return (data ?? []) as T[];
  }

  async getById(id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as T;
  }

  async create(
    item: Omit<T, "id" | "created_at" | "updated_at">
  ): Promise<T> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(item as any)
      .select()
      .single();

    if (error) throw error;

    return data as T;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update({
        ...(updates as object),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as T;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}