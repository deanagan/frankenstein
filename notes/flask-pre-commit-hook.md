To integrate running Flask unit tests as a pre-commit hook, you can use **`pre-commit`**, a framework for managing and maintaining multi-language pre-commit hooks. Here's how you can set it up to run your Flask unit tests before a commit:

### Step-by-Step Guide:

#### 1. **Install `pre-commit`**

First, install the `pre-commit` package, which will manage your git hooks.

```bash
pip install pre-commit
```

#### 2. **Create or Update `.pre-commit-config.yaml`**

In the root directory of your project, create a file called `.pre-commit-config.yaml` if it doesn’t already exist. This file will contain the configuration for the hooks you want to run. You can use it to configure the pre-commit hook to run your Flask unit tests.

For example:

```yaml
- repo: https://github.com/pre-commit/mirrors-hooks
  rev: v3.1.0  # This is the version of the hook repository you want to use
  hooks:
    - id: python-unit-test
      name: Run Flask unit tests
      entry: pytest  # or use 'flask test' depending on your Flask app's test command
      language: python
      types: [python]
```

This hook configuration will use `pytest` (or whatever testing framework you're using) to run your tests before you make a commit. You can replace `pytest` with the test command specific to your Flask application, like `flask test`, depending on how you set up your Flask testing commands.

#### 3. **Configure `pre-commit` to Run the Tests**

Now you need to tell `pre-commit` to run the tests during the commit process. To do this, you'll update your `.pre-commit-config.yaml` file to specify the command that should be executed.

Here’s an example of running `pytest` for Flask unit tests:

```yaml
- repo: https://github.com/pre-commit/mirrors-hooks
  rev: v3.1.0
  hooks:
    - id: python-unit-test
      name: Run Flask unit tests
      entry: pytest
      language: python
      types: [python]
```

Make sure that your test suite can be run using `pytest` or another appropriate command in your environment.

#### 4. **Install `pre-commit` Hooks**

Once the configuration file is in place, you need to install the hooks defined in `.pre-commit-config.yaml` by running the following command:

```bash
pre-commit install
```

This will add the necessary configuration to your `.git/hooks/` directory, which will automatically invoke the hooks when a commit is made.

#### 5. **Testing the Hook**

After installing the pre-commit hook, the next time you try to commit something, the Flask unit tests will be executed first. If the tests fail, the commit will be blocked.

Try making a commit:

```bash
git add .
git commit -m "Testing pre-commit hook"
```

If your tests fail, the commit will be aborted. If the tests pass, the commit will proceed.

#### 6. **Optional: Customize Test Commands**

If you need more flexibility in how the tests are run, you can customize the `entry` in the hook configuration. For example, you might want to specify additional arguments or run a specific test suite:

```yaml
- repo: https://github.com/pre-commit/mirrors-hooks
  rev: v3.1.0
  hooks:
    - id: python-unit-test
      name: Run Flask unit tests
      entry: pytest --maxfail=1 --disable-warnings  # Example additional options
      language: python
      types: [python]
```

#### 7. **Using Flask-Specific Testing Command**

If you use Flask's built-in testing utilities, you may want to run the tests using `flask test` or another Flask-specific command. In that case, modify the `entry` field:

```yaml
- repo: https://github.com/pre-commit/mirrors-hooks
  rev: v3.1.0
  hooks:
    - id: flask-unit-test
      name: Run Flask unit tests
      entry: flask test  # Change to your Flask test command
      language: python
      types: [python]
```

Make sure `flask test` is working as expected in your environment.

---

### Summary:

1. Install `pre-commit` with `pip install pre-commit`.
2. Create a `.pre-commit-config.yaml` file in your project root to configure the pre-commit hook.
3. Add the appropriate `entry` to run your Flask unit tests, such as `pytest` or `flask test`.
4. Install the pre-commit hook with `pre-commit install`.
5. Run `git commit`, and the unit tests will run automatically before the commit is made.

By following these steps, you can ensure that your Flask unit tests run every time you try to make a commit, providing an additional layer of quality control before pushing changes to your repository.
