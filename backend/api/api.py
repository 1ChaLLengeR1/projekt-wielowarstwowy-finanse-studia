from fastapi import APIRouter

# login
from api.auth.login import router as login_router

# Outstanding_money
from api.outstanding_money.collection import router as collection_router_outstanding_money
from api.outstanding_money.create import router as create_router_outstanding_money
from api.outstanding_money.update import router as update_router_outstanding_money
from api.outstanding_money.delete import router as delete_router_outstanding_money

# Logs
from api.logs.create import router as create_router_logs
from api.logs.collection import router as collection_router_logs

# Calculator
from api.fuel_calculator.calculation import router as calculation_router_fuel_calculation

# Tasks
from api.tasks.create import router as create_router_task
from api.tasks.collection import router as collection_router_task
from api.tasks.update import router as update_router_task
from api.tasks.delete import router as delete_router_task
from api.tasks.statistics import router as statistics_router_task

api_router = APIRouter()

# Login
api_router.include_router(login_router)

# Outstanding_money
api_router.include_router(collection_router_outstanding_money)
api_router.include_router(create_router_outstanding_money)
api_router.include_router(update_router_outstanding_money)
api_router.include_router(delete_router_outstanding_money)

# Logs
api_router.include_router(collection_router_logs)
api_router.include_router(create_router_logs)

# Fuel_calculator
api_router.include_router(calculation_router_fuel_calculation)

# Tasks
api_router.include_router(create_router_task)
api_router.include_router(collection_router_task)
api_router.include_router(update_router_task)
api_router.include_router(delete_router_task)
api_router.include_router(statistics_router_task)
