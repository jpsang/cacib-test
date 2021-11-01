from flask import Flask, request, jsonify, abort
from flask_cors import CORS, cross_origin

'''
cd back
environment\Scripts\activate
flask run
Running by default on : http://127.0.0.1:5000/
'''

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

stack = list()
ops = {'add': '+', 'sub': '-', 'mul': '*', 'div': '/'}
# ops = ['+', '-', '*', '/']

@app.route('/rpn/op', methods= ['GET'])
@cross_origin()
def list_all_the_operand():
    return jsonify(list(ops.values()))

@app.route('/rpn/stack', methods= ['GET'])
def get_current_stack():
    return jsonify(stack)

@app.route('/rpn/stack', methods= ['DELETE'])
def clear_stack():
    return jsonify(stack.clear())

@app.route('/rpn/stack', methods= ['POST'])
def add_to_stack():
    data = request.args.get('value')
    stack.append(float(data))
    return jsonify(stack)

@app.route('/rpn/op/stack', methods=['POST'])
def apply_operand_to_stack():
    op = request.args.get('op')

    if len(stack) < 2:
        abort(400, 'Not enough value in stack')
    else:
        if ops.get(op) == '+':
            new_value = stack[-2] + stack[-1]
            del stack[-2:]
            stack.append(new_value)
        elif ops.get(op) == '-':
            new_value = stack[-2] - stack[-1]
            del stack[-2:]
            stack.append(new_value)
        elif ops.get(op) == '*':
            new_value = stack[-2] * stack[-1]
            del stack[-2:]
            stack.append(new_value)
        else:
            new_value = stack[-2] / stack[-1]
            del stack[-2:]
            stack.append(new_value)
        return jsonify(stack)