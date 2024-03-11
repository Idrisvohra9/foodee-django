import environ
env = environ.Env()
environ.Env.read_env()

print(env("SUPABASE_BUCKET"))