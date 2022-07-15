import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";


export class ShowDatabase extends BaseDatabase {

    private static TABLE_NAME = "NOME_TABELA_SHOWS";
  
    public async registerShow(show: Show): Promise<void> {
  
      try {
        await this.getConnection()
          .insert({
            id: show.getId(),
            week_day: show.getWeekDay(),
            start_time : show.getStartTime(),
            end_time : show.getEndTime(),
            band_id: show.getBandId()

          })
          .into(ShowDatabase.TABLE_NAME);
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }
  
    public async getShowFromDay(week_day: string): Promise<Show[]> {
      try {
        const result = await this.getConnection()
          .select("*")
          .from(ShowDatabase.TABLE_NAME)          
          .where({week_day})
          
  
        return result[0] && result.map((show => Show.toShowModel(show)))
  
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }
  }