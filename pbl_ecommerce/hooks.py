from . import __version__ as app_version

app_name = "pbl_ecommerce"
app_title = "Premier Bio-Life Supplies E Commerce platform"
app_publisher = "Premier Bio-Life Supplies"
app_description = "Premier Bio-Life Supplies E Commerce platform"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "info@pbl.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/pbl_ecommerce/css/pbl_ecommerce.css"
# app_include_js = "/assets/pbl_ecommerce/js/pbl_ecommerce.js"

# include js, css files in header of web template
# web_include_css = "/assets/pbl_ecommerce/css/pbl_ecommerce.css"
# web_include_js = "/assets/pbl_ecommerce/js/pbl_ecommerce.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "pbl_ecommerce/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "pbl_ecommerce.install.before_install"
# after_install = "pbl_ecommerce.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "pbl_ecommerce.uninstall.before_uninstall"
# after_uninstall = "pbl_ecommerce.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "pbl_ecommerce.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"pbl_ecommerce.tasks.all"
# 	],
# 	"daily": [
# 		"pbl_ecommerce.tasks.daily"
# 	],
# 	"hourly": [
# 		"pbl_ecommerce.tasks.hourly"
# 	],
# 	"weekly": [
# 		"pbl_ecommerce.tasks.weekly"
# 	]
# 	"monthly": [
# 		"pbl_ecommerce.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "pbl_ecommerce.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "pbl_ecommerce.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "pbl_ecommerce.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


# User Data Protection
# --------------------

user_data_fields = [
	{
		"doctype": "{doctype_1}",
		"filter_by": "{filter_by}",
		"redact_fields": ["{field_1}", "{field_2}"],
		"partial": 1,
	},
	{
		"doctype": "{doctype_2}",
		"filter_by": "{filter_by}",
		"partial": 1,
	},
	{
		"doctype": "{doctype_3}",
		"strict": False,
	},
	{
		"doctype": "{doctype_4}"
	}
]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"pbl_ecommerce.auth.validate"
# ]

# Translation
# --------------------------------

# Make link fields search translated document names for these DocTypes
# Recommended only for DocTypes which have limited documents with untranslated names
# For example: Role, Gender, etc.
# translated_search_doctypes = []
fixtures =["Web Page","File"]
website_route_rules = [{'from_route': '/shop', 'to_route': 'shop'},
                       {'from_route': '/quote', 'to_route': 'quote'},
                       {'from_route': '/', 'to_route': 'shop'},
                     
                       ]