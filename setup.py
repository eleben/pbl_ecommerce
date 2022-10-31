from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in pbl_ecommerce/__init__.py
from pbl_ecommerce import __version__ as version

setup(
	name="pbl_ecommerce",
	version=version,
	description="Premier Bio-Life Supplies E Commerce platform",
	author="Premier Bio-Life Supplies",
	author_email="info@pbl.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
