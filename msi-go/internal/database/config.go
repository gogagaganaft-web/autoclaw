package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type DBConfig struct {
	Server, Port, User, Password, Database string
}

var dbNamesMap = map[string]string{
	"DB1UL": "1.Курск ЮЛ", "DB2UL": "2.Тверь ЮЛ", "DB3UL": "3.Смоленск ЮЛ",
	"DB4UL": "4.Мурманск ЮЛ", "DB5UL": "5.Хакасия ЮЛ", "DB6UL": "6.ДНР ЮЛ",
	"DB7UL": "7.ЛНР ЮЛ", "DB8UL": "8.Запорожье ЮЛ", "DB9UL": "9.Херсон ЮЛ",
	"DB1FL": "1.Курск ФЛ", "DB2FL": "2.Тверь ФЛ", "DB3FL": "3.Смоленск ФЛ",
	"DB4FL": "4.Мурманск ФЛ", "DB5FL": "5.Хакасия ФЛ", "DB6FL": "6.ДНР ФЛ",
	"DB7FL": "7.ЛНР ФЛ", "DB8FL": "8.Запорожье ФЛ", "DB9FL": "9.Херсон ФЛ",
}

var dbConfigs map[string]DBConfig

func envPath() string {
	exe, err := os.Executable()
	if err != nil {
		return ".env"
	}
	dir := exe
	for i := len(exe) - 1; i >= 0; i-- {
		if exe[i] == '\\' || exe[i] == '/' {
			dir = exe[:i+1]
			break
		}
	}
	return dir + ".env"
}

func InitDB() {
	if err := godotenv.Load(envPath()); err != nil {
		log.Println("Warning: no .env file found, using system env")
	}
	dbConfigs = make(map[string]DBConfig)
	for _, key := range []string{
		"DB1UL", "DB2UL", "DB3UL", "DB4UL", "DB5UL",
		"DB6UL", "DB7UL", "DB8UL", "DB9UL",
		"DB1FL", "DB2FL", "DB3FL", "DB4FL", "DB5FL",
		"DB6FL", "DB7FL", "DB8FL", "DB9FL",
	} {
		dbConfigs[key] = DBConfig{
			Server:   os.Getenv(key + "_SERVER"),
			Port:     os.Getenv(key + "_PORT"),
			User:     os.Getenv(key + "_USER"),
			Password: os.Getenv(key + "_PASSWORD"),
			Database: os.Getenv(key + "_DATABASE"),
		}
	}
}

func GetDBConfig(dbName string) (DBConfig, bool) {
	cfg, ok := dbConfigs[dbName]
	return cfg, ok
}

func GetDBDisplayName(dbName string) string {
	if name, ok := dbNamesMap[dbName]; ok {
		return name
	}
	return dbName
}
